import { GoogleGenAI, Type } from "@google/genai";
import type { InvoiceData, VerificationResult } from "../types";

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        if (typeof reader.result === 'string') {
            resolve(reader.result.split(',')[1]);
        } else {
            resolve('');
        }
    };
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

const invoiceSchema = {
    type: Type.OBJECT,
    properties: {
        companyName: { type: Type.STRING, description: "The name of the company issuing the invoice." },
        bankAccountName: { type: Type.STRING, description: "The name of the bank account holder." },
        developmentTime: { type: Type.STRING, description: "The development or lead time for the product." },
        paymentTerms: { type: Type.STRING, description: "The payment terms (e.g., 30% deposit)." },
        incoterm: { type: Type.STRING, description: "The INCOTERM (e.g., FOB, EXW)." },
        incotermDetails: { type: Type.STRING, description: "Details for the INCOTERM (e.g., port for FOB, address for EXW)." },
        recipientName: { type: Type.STRING, description: "The name of the recipient/consignee." },
        recipientAddress: { type: Type.STRING, description: "The full address of the recipient." },
        recipientTaxID: { type: Type.STRING, description: "The Tax ID or registration number of the recipient." },
        hsCode: { type: Type.STRING, description: "The Harmonized System (HS) Code or NCM code for the product(s)." },
    },
     required: [
        "companyName", "bankAccountName", "developmentTime", "paymentTerms", 
        "incoterm", "incotermDetails", "recipientName", "recipientAddress", "recipientTaxID", "hsCode"
    ],
};

export const verifyInvoice = async (file: File): Promise<VerificationResult> => {
  const ai = new GoogleGenAI({ apiKey: "AIzaSyChz3pgtO9o5GRRbFgX5KymibS_0XpYUww" });

  const pdfPart = await fileToGenerativePart(file);

  const prompt = `Analyze this proforma invoice and extract the information based on the provided JSON schema. Ensure all fields are filled accurately from the document.

Important Rules:
- Extract text exactly as it appears in the document.
- If the INCOTERM is FOB, incotermDetails should be the port.
- If the INCOTERM is EXW, incotermDetails should be the pickup address.
- The HS Code (or NCM code) is a numerical code for customs classification. Extract this code.
- If any information is not found, return "Not found".`;
  
  const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [{ text: prompt }, pdfPart] },
      config: {
          responseMimeType: "application/json",
          responseSchema: invoiceSchema,
      },
  });

  const rawJsonText = response.text;
  
  let json: InvoiceData;
  try {
    json = JSON.parse(rawJsonText) as InvoiceData;
  } catch (e) {
    console.error("Failed to parse Gemini response:", rawJsonText);
    throw new Error("Could not extract valid data from the PDF. The AI response was not valid JSON.");
  }
  
  // Perform validation logic
  const companyMatch =
    !!json.companyName &&
    !!json.bankAccountName &&
    json.companyName.toUpperCase().trim() === json.bankAccountName.toUpperCase().trim();

  const recipientName = json.recipientName?.toUpperCase() || "";
  const recipientAddress = json.recipientAddress?.toUpperCase() || "";
  const recipientTaxID = json.recipientTaxID?.toString() || "";

  const recipientMatch =
    recipientName.includes("GUANGZHOU") &&
    recipientName.includes("BAIYUN") &&
    recipientAddress.includes("THOMSON") &&
    recipientAddress.includes("HONG KONG") &&
    recipientTaxID.includes("76303593");

  const incotermType = (json.incoterm || "UNKNOWN").toUpperCase().trim();
  let incotermDetails = json.incotermDetails || "Not specified";

  if (!incotermType.includes("FOB") && !incotermType.includes("EXW") && incotermType !== "UNKNOWN") {
    incotermDetails = "INCOTERM DIFFERENT FROM THOSE USED";
  }

  return {
    companyName: json.companyName || "Not found",
    bankAccountName: json.bankAccountName || "Not found",
    companyMatch,
    developmentTime: json.developmentTime || "Not specified",
    paymentTerms: json.paymentTerms || "Not specified",
    incoterm: incotermType,
    incotermDetails,
    recipientName: json.recipientName || "Not found",
    recipientAddress: json.recipientAddress || "Not found",
    recipientTaxID: json.recipientTaxID || "Not found",
    recipientMatch,
    hsCode: json.hsCode || "Not found",
  };
};
import { DocumentType, PhoneCode } from "@/types/enums";

export function useMobilePaymentData() {
  const phoneCodes: PhoneCode[] = Object.values(PhoneCode);
  const documentTypes: DocumentType[] = Object.values(DocumentType);

  return {
    phoneCodes,
    documentTypes,
  };
}

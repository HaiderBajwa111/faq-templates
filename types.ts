export interface Template {
  id: string;
  name: string;
  description?: string | null;
  category: string;
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  previewStyle: string;
  isPublished: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

import { IDateAt } from "@/@core/utils/contracts-commons";

export interface PackagingForm {
  description: string;
  code: string
}
export interface PackagingModel extends IDateAt, PackagingForm {
  id: number;
  editable: boolean
}

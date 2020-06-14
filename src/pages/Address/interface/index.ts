// 地址
export interface AddressItemInterface {
  id: string | number;
  name: string;
  tel: string;
  address: string;
  isDefault?: boolean;
}
// 地址列表
export type AddressListInterface = AddressItemInterface[];

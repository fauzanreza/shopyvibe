declare module 'midtrans-client' {
  export interface TransactionDetails {
    order_id: string;
    gross_amount: number;
  }

  export interface ItemDetails {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }

  export interface CustomerDetails {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
  }

  export interface GopayOptions {
    enable_callback?: boolean;
    callback_url?: string;
  }

  export interface ChargeRequest {
    payment_type: string;
    transaction_details: TransactionDetails;
    item_details?: ItemDetails[];
    customer_details?: CustomerDetails;
    gopay?: GopayOptions;
    // Add other payment method options as needed
  }

  export interface ChargeResponse {
    expiry_time: any;
    status_code: string;
    status_message: string;
    transaction_id: string;
    order_id: string;
    merchant_id: string;
    gross_amount: string;
    currency: string;
    payment_type: string;
    transaction_time: string;
    transaction_status: string;
    fraud_status: string;
    actions?: Array<{
      name: string;
      method: string;
      url: string;
    }>;
    // Add other response fields as needed
  }

  export class CoreApi {
    constructor(options: {
      isProduction?: boolean;
      serverKey: string;
      clientKey?: string;
    });

    charge(payload: ChargeRequest): Promise<ChargeResponse>;
  }

  export class Snap {
    constructor(options: {
      isProduction?: boolean;
      serverKey: string;
      clientKey?: string;
    });

    createTransactionToken(payload: any): Promise<any>;
    
  }

  interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}


interface GopayItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface GopayRequest {
  payment_type: string;
  transaction_details: TransactionDetails;
  items: GopayItem[];
  gopay: {
    enable_callback: boolean;
    callback_url: string;
  };
}

interface GopayAction {
  name: string;
  method: string;
  url: string;
}

interface GopayResponse {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  merchant_id: string;
  gross_amount: string;
  currency: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  fraud_status: string;
  actions?: GopayAction[];
}
}
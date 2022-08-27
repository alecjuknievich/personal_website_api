export interface Coupon {
    r: string;
    s: string;
    v: number;
}

export interface UserCoupon {
    coupon: Coupon;
    voucherSigner: string;
}



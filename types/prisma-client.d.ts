/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "@prisma/client" {
  export class PrismaClient {
    constructor(options?: unknown)
    brand: any
    category: any
    product: any
    productImage: any
    banner: any
    article: any
    promo: any
    review: any
    $transaction: any
    $disconnect: any
  }
}

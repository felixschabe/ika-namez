import fetch from "node-fetch";
import { writeFileSync } from "fs";

indexNames().then((ikeaProducts: IkeaProduct[]) => {
  console.log(
    "we are now filtering " +
      ikeaProducts.length +
      " item(s) for unique names.. this may or may not take a while"
  );

  const uniqueIkeaProducts = ikeaProducts.filter((ikeaProduct: IkeaProduct) => {
    const firstIkeaProduct = ikeaProducts.find((element: IkeaProduct) => {
      return ikeaProduct.name.startsWith(element.name);
    });
    return ikeaProduct === firstIkeaProduct;
  });

  console.log(
    "we`ve found " + uniqueIkeaProducts.length + " item(s) with unique names"
  );

  uniqueIkeaProducts.forEach((value, index) => {
    value.pos = index;
    return value;
  });

  console.log("we`ve added pos");

  writeFileSync(
    "output/ikeaProducts.json",
    JSON.stringify(uniqueIkeaProducts, null, 2)
  );
});

async function indexNames(): Promise<IkeaProduct[]> {
  let searchStrings =
    "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,1,2,3,4,5,6,7,8,9,0,tisch,lampe,ikea,raum,stuhl,deko,bett,sofa,angebote,produkte";

  const IKEA_API_URL: URL = new URL(
    "https://sik.search.blue.cdtapps.com/de/de/search-result-page?max-num-filters=8&q=b&autocorrect=true&size=99999&columns=4&store=&subcategories-style=tree-navigation&types=PRODUCT%2CCONTENT%2CPLANNER%2CREFINED_SEARCHES%2CANSWER&c=sr&v=20211021"
  );

  const ikeaProducts: IkeaProduct[] = [];

  let searchStringsArray = searchStrings.split(",");

  for (
    let searchStringPosition = 0;
    searchStringPosition < searchStringsArray.length;
    searchStringPosition++
  ) {
    const letter: string = searchStringsArray[searchStringPosition];
    const ikeaQuery: URL = IKEA_API_URL;
    ikeaQuery.searchParams.set("q", letter);
    console.log("Fetching: " + ikeaQuery.href);
    await fetch(ikeaQuery.href)
      .then((response: any) => response.json())
      .then((data: any) => {
        const items = data.searchResultPage.products.main.items;
        for (
          let currentItemNumber = 0;
          currentItemNumber < items.length;
          currentItemNumber++
        ) {
          let element = items[currentItemNumber];
          const product: any | null = element.product || null;
          if (product) {
            const id = product.id || "";
            const priceNumeral = product.priceNumeral || "";
            const name = product.name || "";
            const typeName = product.typeName || "";
            const pipUrl = product.pipUrl || "";
            const mainImageUrl = product.mainImageUrl || "";
            const mainImageAlt = product.mainImageAlt || "";

            ikeaProducts.push(
              new IkeaProduct(
                id,
                currentItemNumber,
                -1,
                priceNumeral,
                name,
                typeName,
                pipUrl,
                mainImageUrl,
                mainImageAlt
              )
            );
          }
        }
      });
  }

  return ikeaProducts;
}

class IkeaProduct {
  public id: string;
  public localId: number;
  public pos: number;
  public priceNumeral: number;
  public name: string;
  public typeName: number;
  public pipUrl: string;
  public mainImageUrl: string;
  public mainImageAlt: string;

  constructor(
    id: string,
    localId: number,
    pos: number,
    priceNumeral: number,
    name: string,
    typeName: number,
    pipUrl: string,
    mainImageUrl: string,
    mainImageAlt: string
  ) {
    this.id = id;
    this.localId = localId;
    this.pos = pos;
    this.priceNumeral = priceNumeral;
    this.name = name;
    this.typeName = typeName;
    this.pipUrl = pipUrl;
    this.mainImageUrl = mainImageUrl;
    this.mainImageAlt = mainImageAlt;
  }
}

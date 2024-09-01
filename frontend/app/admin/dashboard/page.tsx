import AsideAdmin from "@/components/admin/AsideAdmin";
import HeaderAdmin from "@/components/admin/HeaderAdmin";
import MainAdmin from "@/components/admin/MainAdmin";

export const description =
  "A product edit page. The product edit page has a form to edit the product details, stock, product category, product status, and product images. The product edit page has a sidebar navigation and a main content area. The main content area has a form to edit the product details, stock, product category, product status, and product images. The sidebar navigation has links to product details, stock, product category, product status, and product images.";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AsideAdmin />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <HeaderAdmin />
        <MainAdmin />
      </div>
    </div>
  );
}

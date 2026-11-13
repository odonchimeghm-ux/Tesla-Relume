export type NavLink = { label: string; href: string };

export const mainLinks: NavLink[] = [
  { label: "Model 3", href: "/model3" },
  { label: "Model Y", href: "/modely" },
  { label: "Эрчим хүч", href: "#" },
  { label: "Дэлгүүр", href: "#" },
];

export const footerLinks: NavLink[] = [
  { label: "Model 3", href: "/model3" },
  { label: "Model Y", href: "/modely" },
  { label: "Эрчим хүч", href: "#" },
  { label: "Цэнэглэлт", href: "#" },
  { label: "Танилцах", href: "#" },
  { label: "Дэлгүүр", href: "#" },
];

export const legalLinks: NavLink[] = [
  { label: "Нууцлалын бодлого", href: "#" },
  { label: "Үйлчилгээний нөхцөл", href: "#" },
  { label: "Күүки тохиргоо", href: "#" },
];

export type MegaMenuGroup = {
  heading: string;
  items: { title: string; description: string; href: string }[];
};

const pageDescription = "Хуудасны товч тайлбар энд байрлана";

export const megaMenuGroups: MegaMenuGroup[] = [
  {
    heading: "Хуудасны бүлэг 1",
    items: ["Нэгдүгээр хуудас", "Хоёрдугаар хуудас", "Гуравдугаар хуудас", "Дөрөвдүгээр хуудас"].map(
      (title) => ({ title, description: pageDescription, href: "#" }),
    ),
  },
  {
    heading: "Хуудасны бүлэг 2",
    items: ["Тавдугаар хуудас", "Зургадугаар хуудас", "Долдугаар хуудас", "Наймдугаар хуудас"].map(
      (title) => ({ title, description: pageDescription, href: "#" }),
    ),
  },
];

export type BlogPost = { title: string; excerpt: string; image: string; href: string };

export const megaMenuPosts: BlogPost[] = Array.from({ length: 2 }, () => ({
  title: "Нийтлэлийн гарчиг",
  excerpt: "Нийтлэлийн товч тайлбар энд байрлана",
  image: "/assets/blog-thumb.png",
  href: "#",
}));

import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
    await mongooseConnect();

    try {
        const { categories, sort, ...filters } = req.query;
        const productsQuery = {};

        if (categories) {
            productsQuery.category = { $in: categories.split(",") };
        }

        if (Object.keys(filters).length > 0) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value) {
                    productsQuery[`properties.${key}`] = value;
                }
            });
        }

        let sortOptions = {};
        if (sort && sort.includes("-")) {
            const [sortField, sortOrder] = sort.split("-");
            if (sortField && (sortOrder === "asc" || sortOrder === "desc")) {
                sortOptions[sortField] = sortOrder === "asc" ? 1 : -1;
            }
        }

        const products = await Product.find(productsQuery, null, {
            sort: sortOptions,
        });

        res.json(products);
    } catch (error) {
        console.error("Ошибка при получении товаров:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
}

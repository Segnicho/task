import { DataTypes } from "sequelize";
import sequelize from "../db.js";
const Product = sequelize.define("Product", {
    ItemNo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
});
export default Product;

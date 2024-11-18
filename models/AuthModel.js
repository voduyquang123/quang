function normalizePhone(phone) {
  return phone.replace(/\s+/g, "").replace("+", "");
}

const UserModel = sequelize.define(
  "User",
  {
    // Các trường dữ liệu
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
      set(value) {
        // Trước khi lưu vào cơ sở dữ liệu, chuẩn hóa số điện thoại
        this.setDataValue("phone", normalizePhone(value));
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    underscored: true,
  }
);

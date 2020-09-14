using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BaoCaoHQTCSDL.Models
{
    public class ProductModel
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("ProductID")]
        public int ProductID { get; set; }

        [BsonElement("Product_name")]
        public string ProductName { get; set; }

        [BsonElement("Category")]
        public ObjectId Category { get; set; }

        public string CategoryName { get; set; }

        public int Total { get; set; }
    }

    public class UserModel
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("Ten")]
        public string Ten { get; set; }

        [BsonElement("SoDienThoai")]
        public string SoDienThoai { get; set; }

        [BsonElement("NgaySinh")]
        public string NgaySinh { get; set; }
    }

    public class OrderModel
    {
        [BsonElement("ProductID")]
        public int ProductID { get; set; }

        [BsonElement("UserID")]
        public ObjectId UserID { get; set; }

        [BsonElement("CreatedDate")]
        public BsonDateTime CreatedDate { get; set; }

        [BsonElement("Amount")]
        public int Amount { get; set; }
    }

    public class CategoryModel
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("Name")]
        public string Name { get; set; }
    }

    public class FilterModel
    {
        public string SearchString { get; set; }

        public int Start { get; set; }

        public int End { get; set; }
    }
}
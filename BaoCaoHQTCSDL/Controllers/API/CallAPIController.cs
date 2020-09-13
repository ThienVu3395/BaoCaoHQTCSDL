﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using MongoDB.Bson;
using MongoDB.Driver;
using BaoCaoHQTCSDL.App_Start;
using BaoCaoHQTCSDL.Models;

namespace VuTest.Controllers.API
{
    [RoutePrefix("API/QLSP")]
    public class CallAPIController : ApiController
    {
        private MongoContext _dbcontext;

        private IMongoCollection<ProductModel> productCollection;

        private IMongoCollection<CategoryModel> categoryCollection;

        private IMongoCollection<OrderModel> orderCollection;

        private IMongoCollection<UserModel> userCollection;

        public CallAPIController()
        {
            _dbcontext = new MongoContext();
            productCollection = _dbcontext._database.GetCollection<ProductModel>("Product");
            categoryCollection = _dbcontext._database.GetCollection<CategoryModel>("Category");
            orderCollection = _dbcontext._database.GetCollection<OrderModel>("Order");
            userCollection = _dbcontext._database.GetCollection<UserModel>("User");
        }

        [HttpGet]
        [Route("LayDSSP")]
        public IHttpActionResult LayDSSP()
        {
            var collection = _dbcontext._database.GetCollection<ProductModel>("Product").AsQueryable().ToList();
            var collection2 = _dbcontext._database.GetCollection<CategoryModel>("Category").AsQueryable().ToList();
            var result = from i in collection
                         join j in collection2 on i.Category equals j.Id
                         where (i.Category == j.Id)
                         select new
                         {
                             i.Id,
                             i.ProductID,
                             i.ProductName,
                             CategoryName = j.Name,
                         };
            List<ProductModel> productList = new List<ProductModel>();
            if (result.ToList().Count > 0)
            {
                foreach (var item in result.ToList())
                {
                    ProductModel product = new ProductModel();
                    product.Id = item.Id;
                    product.ProductID = item.ProductID;
                    product.ProductName = item.ProductName;
                    product.CategoryName = item.CategoryName;
                    productList.Add(product);
                }
            }
            return Ok(productList);
        }

        [HttpGet]
        [Route("LayCategory")]
        public IHttpActionResult LayCategory()
        {
            List<CategoryModel> categoryList = categoryCollection.AsQueryable<CategoryModel>().ToList();
            return Ok(categoryList);
        }

        [HttpGet]
        [Route("GetDetail")]
        public IHttpActionResult GetDetail(string id)
        {
            var testID = new ObjectId(id);
            var a = productCollection.AsQueryable<ProductModel>().FirstOrDefault(x => x.Id == testID);
            return Ok(a);
        }

        [HttpPost]
        [Route("ThemSanPham")]
        public IHttpActionResult ThemSanPham(ProductModel createProductModel)
        {
            ProductModel objProduct = new ProductModel();
            objProduct.ProductID = productCollection.AsQueryable().Count() + 1;
            objProduct.ProductName = createProductModel.ProductName;
            objProduct.Category = new ObjectId(createProductModel.CategoryName);
            productCollection.InsertOne(objProduct);
            return Ok();
        }

        [HttpPost]
        [Route("CapNhatSanPham")]
        public IHttpActionResult CapNhatSanPham(string id ,ProductModel updateProductModel)
        {
            try
            {
                var fifter = Builders<ProductModel>.Filter.Eq("_id", ObjectId.Parse(id));
                var update = Builders<ProductModel>.Update
                            .Set("ProductName", updateProductModel.ProductName)
                            .Set("Category", ObjectId.Parse(updateProductModel.CategoryName));
                var result = productCollection.UpdateOne(fifter, update);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("XoaSP")]
        public IHttpActionResult XoaSP(string id)
        {
            try
            {
                productCollection.DeleteOne(Builders<ProductModel>.Filter.Eq("_id", ObjectId.Parse(id)));
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}

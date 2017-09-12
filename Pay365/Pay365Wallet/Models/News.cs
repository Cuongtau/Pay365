using System;
using System.Collections.Generic;

namespace Pay365Wallet.Models
{
    [Serializable]
    public class News
    {
        public int NewsID { get; set; }
        public int CategoryID { get; set; }
        public int LanguageID { get; set; }
        public bool IsHot { get; set; }
        public string Title { get; set; }
        public string Alias { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public string Tags { get; set; }
        public int Status { get; set; }
        public string CreatedUser { get; set; }
        public string UpdatedUser { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdateTime { get; set; }
        public DateTime PublishTime { get; set; }
        public string Content { get; set; }
        public string ListCategory { get; set; }
        public int SystemID { get; set; }
        public string DateFormat { get { return string.Format("{0:dd/MM/yyyy}", this.PublishTime); } }
    }

    [Serializable]
    public class NewsDataResponse
    {       
        public int Results { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public List<News> News { get; set; }
    }

}
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Pay365.Pay365.Editions.Dto;

namespace Pay365.Pay365.MultiTenancy.Dto
{
    public class GetTenantFeaturesForEditOutput
    {
        public List<NameValueDto> FeatureValues { get; set; }

        public List<FlatFeatureDto> Features { get; set; }
    }
}
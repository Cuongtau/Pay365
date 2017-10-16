namespace ShoppinOnline.Model.Response
{
    public class AccountAuthenResult
    {
        public int AccountID { get; set; }

        public string AccountName { get; set; }

    }
    public class AuthenticateResultModel
    {
        public string AccessToken { get; set; }

        public string EncryptedAccessToken { get; set; }

        public int ExpireInSeconds { get; set; }

        public long UserId { get; set; }
        public string ReturnUrl { get; set; }
    }
}

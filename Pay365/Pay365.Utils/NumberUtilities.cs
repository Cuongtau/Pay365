namespace Pay365.Utils
{
    public class NumberUtilities
    {
        public static int LineNumber([System.Runtime.CompilerServices.CallerLineNumber] int lineNumber = 0)
        {
            return lineNumber;
        }
    }
}

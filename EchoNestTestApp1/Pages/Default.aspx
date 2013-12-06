<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="EchoNestTestApp1.Pages.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>

<body>
    <form>
        <input id="searchString" type="text" />
        <input id="searchButton" value="Search Music" type="button" />
    </form>

    <div>
        <table id="echoNestResults">
        </table>
    </div>
</body>
</html>

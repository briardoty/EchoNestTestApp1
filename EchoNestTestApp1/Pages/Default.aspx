<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="EchoNestTestApp1.Pages.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <script src="../Static/JS/jquery-2.0.3.min.js"></script>
    <script src="../Static/JS/Common.js"></script>
    <script src="../Static/JS/RequestBuilder.js"></script>
    <script src="../Static/JS/EchoNestTest.js"></script>

    <title>EchoNest Test App</title>
</head>

<body>
    <form>
        <input id="searchString" type="text" />
        <input id="searchButton" value="Search Artists" type="button" /> <br />
        <label>Artists: </label><select id="artistName"></select> <br />
        <label>Songs: </label><select id="songName"></select>
    </form>

    <div>
        <table id="echoNestResults">
        </table>
    </div>
</body>
</html>

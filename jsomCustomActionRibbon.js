SP.SOD.executeOrDelayUntilScriptLoaded(AddCustomUserAction, "sp.js");

var oListItem;

var siteURL = _spPageContextInfo.siteAbsoluteUrl;
var siteURL2 = _spPageContextInfo.webServerRelativeUrl;
var ListName = "Legajos";
var PicPath16 ="/SiteAssets/images/Print_icon_16x16.png";
var PicPath32 ="/SiteAssets/images/Print_icon_32x32.png";
        
function AddCustomUserAction() {

	//Get the client context and list object  
	var context = new SP.ClientContext.get_current();  
	var list = context.get_web().get_lists().getByTitle(ListName); 
	//Get the custom user action collection and add the user action  
	var customUserAction = list.get_userCustomActions().add();  
	//Set the location of the user action  
	customUserAction.set_location('CommandUI.Ribbon.ListView'); 
	//Add the properties for the custom action  
	var userActionExtension = '<CommandUIExtension xmlns="http://schemas.microsoft.com/sharepoint/">' + '<CommandUIDefinitions>' + '<CommandUIDefinition Location="Ribbon.Documents.Manage.Controls._children">' + '<Button Id="Ribbon.Documents.New.Ribbon" ' + 'Command="Notify" ' + 'Sequence="0" ' + 'Image16by16="' + siteURL + siteURL2 + PicPath16 + '" Image32by32="' + siteURL + siteURL2 + PicPath32 + '" Description="Shows the ID of the current list." ' + 'LabelText="Dale BEBE" ' + 'TemplateAlias="o1"/>' + '</CommandUIDefinition>' + '</CommandUIDefinitions>' + '<CommandUIHandlers>' + '<CommandUIHandler Command="Notify" ' + 'CommandAction="javascript:SP.UI.Notify.addNotification(\'ListId={ListId}\');" />' + '</CommandUIHandlers>' + '</CommandUIExtension>';  
	//Add the command UI extension and update the custom user action  
	customUserAction.set_commandUIExtension(userActionExtension)  
	customUserAction.update();  
	//Load the client context and execute the batch  
	context.load(list, 'UserCustomActions');  
	context.executeQueryAsync(function() {  
	console.log("Custom User Action added successfully to ribbon.");  
	}, function(sender, args) {  
	console.log(args.get_message());  
	});  
}  
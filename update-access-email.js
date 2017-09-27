var ELECTORATE_DROPDOWN_ID = "#id123-control31500616";
var EMAIL_ELEMENT_ID = "#id123-control31500105";
var HEADER_MARKER_SPLITTER = "###";

function getParameterByName(name, url) {
  console.log("made it to getParameterByName");
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function replaceParameterContent() {
  var insertContent = "\n";

  var kids = getParameterByName("kids", url);
  console.log("kids", kids);
  if (kids)
    insertContent +=
      "People in families with children aged 0-4: " + kids + "\n";

  var old = getParameterByName("old", url);
  console.log("old", old);
  if (old) insertContent += "Over 75yrs: " + old + "\n";

  var live = getParameterByName("live", url);
  console.log("live", live);
  if (live) insertContent += "Supported Living Beneficiaries: " + live + "\n";

  var sick = getParameterByName("sick", url);
  console.log("sick", sick);
  if (sick) insertContent += "Sickness Beneficiaries: " + sick + "\n";

  var total = getParameterByName("total", url);
  console.log("total", total);
  if (total)
    insertContent += "Total people with access sensitivity: " + total + "\n";

  return insertContent;
}

function getRelevantEmailContent(fullEmailBody, electorate) {
  var emailParts = fullEmailBody.split(HEADER_MARKER_SPLITTER);
  for (var i = 0; i < emailParts.length - 1; i += 2) {
    var header = emailParts[i].trim() + ",";
    if (header.indexOf(electorate + ",") !== -1) {
      return emailParts(i + 1);
    }
  }
}

function replaceEmailContent() {
  var electorate = $(ELECTORATE_DROPDOWN_ID).val();
  console.log("selected electorate", electorate);
  if (electorate == undefined) return "Please select your electorate.";

  var fullEmailBody = $(EMAIL_ELEMENT_ID).val();
  console.log("prevEmailBody", fullEmailBody);

  var emailBody = getRelevantEmailContent(fullEmailBody, electorate);

  var parameterContent = replaceParameterContent();
  emailBody = emailBody.replace("@@@@", parameterContent);

  console.log("updatedEmailBody", emailBody);
  emailBody.val(emailBody);
}

document.addEventListener("DOMContentLoaded", function() {
  var url = $("input[name=tmp_form_host]").val();
  console.log("url", url);

  // update the letter content when electorate changes
  $(ELECTORATE_DROPDOWN_ID).change(replaceLetterContent);

  // set initial electorate from parameter
  var electorate = getParameterByName("electorate", url);
  console.log("electorate", electorate);
  $(ELECTORATE_DROPDOWN_ID)
    .val(electorate)
    .change();
});

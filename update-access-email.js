var ELECTORATE_DROPDOWN_ID = "#id123-control31500616";
var EMAIL_ELEMENT_ID = "#id123-control31500105";
var EMAIL_SPLITTER = "---";

var ORIGINAL_EMAIL_CONTENT = ""; // this is set on page load

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

  var url = $("input[name=tmp_form_host]").val();
  console.log("url", url);

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

function getRelevantEmailContent(electorate) {
  var emailParts = ORIGINAL_EMAIL_CONTENT.split(EMAIL_SPLITTER);
  for (var i = 0; i < emailParts.length; i++) {
    var emailPart = emailParts[i].trim(/\r?\n/);
    var lines = emailPart.split(/\r?\n/);
    var header = lines.shift();
    if (header.startsWith("ELECTORATE:")) {
      header = header.trim() + ",";
      key = electorate + ",";
      if (header.indexOf(key) !== -1) {
        console.log("email found", emailPart);
        var result = lines.join("\n");
        return result;
      }
    }
  }
  return "Unknown Electorate";
}

function replaceEmailContent() {
  var electorate = $(ELECTORATE_DROPDOWN_ID).val();
  console.log("electorate: ", electorate);
  if (electorate == undefined) {
    $(EMAIL_ELEMENT_ID).val("Please select your electorate.");
    return;
  }

  var emailBody = getRelevantEmailContent(electorate);

  var parameterContent = replaceParameterContent();
  emailBody = emailBody.replace("@@@@", parameterContent);

  console.log("updatedEmailBody: ", emailBody);
  $(EMAIL_ELEMENT_ID).val(emailBody);
}

document.addEventListener("DOMContentLoaded", function() {
  // store the original email content
  ORIGINAL_EMAIL_CONTENT = $(EMAIL_ELEMENT_ID).val();
  console.log("ORIGINAL_EMAIL_CONTENT: ", ORIGINAL_EMAIL_CONTENT);

  // update the letter content when electorate changes
  $(ELECTORATE_DROPDOWN_ID).change(replaceEmailContent);

  // set initial electorate from parameter
  var url = $("input[name=tmp_form_host]").val();
  var electorate = getParameterByName("electorate", url);
  console.log("electorate", electorate);
  $(ELECTORATE_DROPDOWN_ID)
    .val(electorate)
    .change();
});

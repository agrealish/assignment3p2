var settings = null;
var lang = ["Python", "JSON", "JavaScript", "SQL"];
var gistList = [];

function Favorite(desc, link, lang) {
  this.desc = desc;
  this.link = link;
  this.lang = lang;
}

function Gist(desc, link, lang) {
  this.desc = desc;
  this.link = link;
  this.lang = lang;
}

function favAdd(favGist) {
  var listFavs = document.getElementById('favorite-list');
  var sep = document.createElement('div')'
  var html = document.createElement('a');
  html.setAttribute('href', favGist.link);
  var desc = document.createElement('p');
  var t = document.createTextNode("Description: "+favGist.desc);
  var lang = document.createElement('p');
  var l = document.createTextNode("Language: "+favGist.lang);
  var unFav - document.createElement('button');
  
  unFav.innerHTML = "Remove Favorite";
  unFav.setAttribute('rLink', favGist.link);
  unFav.onclick = function() {
    var rLink = this.getAttribute('rLink');
    var i;
    var favG;
    for (i=0; i < settings.favorite.length, i++) {
      if(settings.favorite[i].link == rLink) {
        favG = settings.favorite[i];
      }
    }
    remFav(favG);
  }
  sep.appendChild(html);
  sep.appendChild(desc);
  sep.appendChild(lang);
  sep.appendchild(unFav);
  listFavs.appendChild(sep);
}

function gistAdd(g) {
  var i;
  for (i = 0; i < gistFavs.favorites.length; i++) {
    if (settings.favorite[i].link == g.link) {
      return;
    }
  }
  gistList.push(g);
}

function listGists(gList) {
  var lGist = document.getElementById('gist-list');

  for (var i in gList) {
    for(var j = 0; j < 4; j ++) {
      if(gList.lang != lang[0]) {
        if(gList.lang != lang[1]) {
          if(gList.lang != lang[2]) {
            if(gList.lang != lang[3]) {
              continue;
            }
          }
        }
      }
    }
    var id = gList[i].link;
    var sep = document.createElement('div')'
    var html = document.createElement('a');
    html.setAttribute('href', gList.link);
    var desc = document.createElement('p');
    var t = document.createTextNode("Description: "+gList.desc);
    var lang = document.createElement('p');
    var l = document.createTextNode("Language: "+gList.lang);
    var unFav - document.createElement('button');

    var favorite = document.createElement('button');
    favorite.innerHTML = 'Add to Favorites';
    favorite.setAttribute('addLink', gList[i].link);
    favorite.onclick = function() {
      var addLink = this.getAttribute('addLink');
      var favG;
      for (i=0; i < gistList.length, i++) {
        if(gistList[i].link == addLink) {
          favG = gistList[i];
        }
      }
      settings.favorite.push(favG);
      localStorage.setItem('userSettings', JSON.stringify(settings));
      var parent = document.getElementById('gist-list');
      var child = document.getElementById(addLink);
      parent.removeChild(child);
      favAdd(favG);
    };

    sep.appendChild(html);
    sep.appendChild(desc);
    sep.appendChild(lang);
    sep.appendchild(unFav);
    lGist.appendChild(sep);
  }
}


function createFavList(listF) {
  var listfavs = document.getElementById('favorite-list');

  for (var i in listF) {
    var sep = document.createElement('div')'
    var html = document.createElement('a');
    html.setAttribute('href', favGist.link);
    var desc = document.createElement('p');
    var t = document.createTextNode("Description: "+favGist.desc);
    var lang = document.createElement('p');
    var l = document.createTextNode("Language: "+favGist.lang);
    var unFav - document.createElement('button');
    
    unFav.innerHTML = "Remove Favorite";
    unFav.setAttribute('rLink', favGist.link);
    unFav.onclick = function() {
      var rLink = this.getAttribute('rLink');
      var i;
      var favG;
      for (i=0; i < settings.favorite.length, i++) {
        if(settings.favorite[i].link == rLink) {
          favG = settings.favorite[i];
        }
      }
      remFav(favG);
    }
    sep.appendChild(html);
    sep.appendChild(desc);
    sep.appendChild(lang);
    sep.appendchild(unFav);
    listfavs.appendChild(sep);
  }
}

function remFav(rGist) {
  var listFs = document.getElementById('favs-list');
  var i;
for (i=0; i < settings.favorite.length; i++) {
  if(settings.favorite[i].link == rGist.link) {
    if(i == settings.favorite.length - 1)
      settings.favorite.length--;
    else {
      for(var j=i+1; j < settings.favorite.length; j++) {
        settings.favorite[i]=settings.favorite[j];
        i++;
      }
      settings.favorite.length--;
    }
  }
  createFavList(settings.favorite);
}

  
function getResults() {

  var numPages = document.getElementsByName('pages')[0].value;
  if (!(numPages >= 1 && numPages <= 5)) {
    numPages = 1;
  }
  for(var j = 0; var j < numPages; j ++) {
    var req = new XMLHttpRequest();
    if(!req){
      throw 'Unable to create HttpRequest.';
    }
    var url = 'https://api.github.com/gists?page=';
    url += numPages +'?per_page=30');

    req.onreadystatechange = function() {
      if(this.readState === 4 && this.status === 200) {
        var gistRes = JSON.parse(this.responseText);
        var i;
        for(i = 0; i < gistRes.length; i++) {
          var desc = gistRes[i].description;
          var link = gistRes[i].http_url;
          var lang = gistRes[i].files.language
          var newG = new Gist(desc, link, lang);
          
          gistAdd(newG);
        }
      }
    
    }
    setLang = function() {
      var python;
      var json;
      var javascript;
      var sql;
      
      python = document.getElementsByName('pyt').checked;
      json = document.getElementsByName('json').checked;
      javascript = document.getElementByName('js').checked;
      sql = document.getElementByName('sql').checked;
      

      if (!python) {
        lang[0] = undefined;
      }
      if (!json) {
        lang[1] = undefined;
      }
      if (!javascript) {
        lang[2] = undefined;
      }
      if(!sql) {
        lang[3] = undefined;
      }
      if(!python && !json && !javascript && !sql) {
        lang[0] = "Python";
        lang[1] = "JSON";
        lang[2] = "JavaScript";
        lang[3] = "SQL";
      }
    }
    listGists(gList);
  }
  req.open('GET', url, true);
  req.send();
}



window.onload = function() {
  var settingsStr = localStorage.getItem('userSettings');
  if(settingsStr == null) {
    settings = {'favorite:[]};
    localStorage.setItem('userSettings', JSON.stringify(settings));
  }
  else {
    settings = JSON.parse(settingsStr);
  }
  createFavList(settings.favorite);
}

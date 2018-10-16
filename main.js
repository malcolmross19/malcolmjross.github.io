const path = "./skillIQ.json";
var pluralSightDiv = document.getElementById('plural-sight-div');

window.addEventListener('load', function () {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.responseType = 'json';
    xhr.onload = function(e) { 
      if (this.status == 200) {
          var response = this.response;
          
          for (var i = 0; i < response.length; i++) {
            var badge = response[i];
            var badgeDiv = document.createElement('article');
            pluralSightDiv.appendChild(badgeDiv);
            
            badgeDiv.style.flex = '1 1 auto';
            badgeDiv.style.backgroundColor = '#262626';
            badgeDiv.style.color = 'white';
            badgeDiv.style.margin = '5px';
            badgeDiv.style.textAlign = 'center';
            badgeDiv.style.display = 'flex';
            badgeDiv.style.flexDirection = 'column';
            badgeDiv.style.padding = '10px';
            badgeDiv.style.fontSize = '13px';
            
            var img = document.createElement('img');
            badgeDiv.appendChild(img);
            img.src = badge['thumbnailUrl'];
            img.style.width = '100px';
            img.style.margin = 'auto';
            
            var badgeTitle = document.createElement('label');
            badgeDiv.appendChild(badgeTitle);
            badgeTitle.innerText = badge['title'];
            badgeTitle.style.color = 'lightgray';
            badgeTitle.style.marginBottom = '10px';
            badgeTitle.style.fontSize = '20px';
            
            var level = document.createElement('label');
            badgeDiv.appendChild(level);
            var rank = badge['level'];
            if (rank === 'Expert') {
                level.style.color = 'lightblue';
            } else {
                level.style.color = 'lightgreen';
            }
            level.style.fontWeight = 'bold';
            level.innerText = 'Q ' + rank.toUpperCase() + ' ' + badge['score'];
            
            var percentile = document.createElement('label');
            badgeDiv.appendChild(percentile);
            var pct = Math.round(badge['percentile']);
            var pctWithSuffix = ordinal_suffix_of(pct);
            percentile.innerText = pctWithSuffix + ' percentile';
            percentile.style.marginBottom = '10px';
            
            var verified = document.createElement('label');
            badgeDiv.appendChild(verified);
            var vDate = new Date(badge['dateCompleted'].substr(0,4), badge['dateCompleted'].substr(5,2), badge['dateCompleted'].substr(8,2));
            verified.innerText = 'VERIFIED ' + vDate.getMonth() + '.' +
            vDate.getDate() + '.' + vDate.getFullYear();
          }
      } 
    }
    xhr.send();
})

function ordinal_suffix_of(i) {
    var j = i % 10,
    k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
        return i + "th";
    }
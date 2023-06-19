function generateSitemap() {
  var directory = '/'; 
  var sitemapUrls = [];

  function traverseDirectory(directoryPath) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', directoryPath, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var fileList = xhr.responseText.split('\n');
        for (var i = 0; i < fileList.length; i++) {
          var item = fileList[i].trim();
          if (item !== '') {
            var url = directoryPath + '/' + item;
            if (item.indexOf('.') === -1) { // Jika item adalah folder
              traverseDirectory(url);
            } else { // Jika item adalah file
              sitemapUrls.push(url);
            }
          }
        }
      }
    };
    xhr.send();
  }

  traverseDirectory(directory);

  var xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (var j = 0; j < sitemapUrls.length; j++) {
    xml += '  <url>\n';
    xml += '    <loc>' + sitemapUrls[j] + '</loc>\n';
    xml += '  </url>\n';
  }

  xml += '</urlset>';

  var downloadLink = document.createElement('a');
  downloadLink.href = 'data:text/xml;charset=utf-8,' + encodeURIComponent(xml);
  downloadLink.download = 'sitemap.xml';
  downloadLink.innerText = 'Download Sitemap';

  document.body.appendChild(downloadLink);
          }

function generateSitemapUrls(directory, urls) {
  var files = directory.listFiles();

  for (var i = 0; i < files.length; i++) {
    var file = files[i];

    if (file.isDirectory()) {
      urls.push(file.getPath() + '/');
      generateSitemapUrls(file, urls);
    }
  }
}

var sitemapUrls = [];
generateSitemapUrls(DriveApp.getRootFolder(), sitemapUrls);

var xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

for (var i = 0; i < sitemapUrls.length; i++) {
  xml += '  <url>\n';
  xml += '    <loc>' + sitemapUrls[i] + '</loc>\n';
  xml += '  </url>\n';
}

xml += '</urlset>';

var sitemapLink = document.createElement('a');
sitemapLink.href = 'data:text/xml;charset=utf-8,' + encodeURIComponent(xml);
sitemapLink.download = 'sitemap.xml';
sitemapLink.innerText = 'Download Sitemap';

document.body.appendChild(sitemapLink);


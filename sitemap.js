// Fungsi untuk menghasilkan sitemap.xml
function generateSitemap(directory) {
  var xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // AJAX request untuk mendapatkan daftar file dan folder di direktori
  var request = new XMLHttpRequest();
  request.open('GET', 'get_files.php?dir=' + encodeURIComponent(directory), true);
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      var files = JSON.parse(request.responseText);

      files.forEach(function(file) {
        var path = directory + '/' + file.name;
        var url = 'http://localhost' + path; // Ubah sesuai dengan URL localhost Anda

        if (file.type === 'directory') {
          url += '/';
          xml += '  <url>\n';
          xml += '    <loc>' + url + '</loc>\n';
          xml += '  </url>\n';

          xml += generateSitemap(path); // Rekursif untuk menjelajahi folder
        } else {
          xml += '  <url>\n';
          xml += '    <loc>' + url + '</loc>\n';
          xml += '  </url>\n';
        }
      });

      xml += '</urlset>';

      // Simpan sitemap.xml ke file
      var downloadLink = document.createElement('a');
      downloadLink.href = 'data:text/xml;charset=utf-8,' + encodeURIComponent(xml);
      downloadLink.download = 'sitemap.xml';
      downloadLink.innerText = 'Download Sitemap';
      document.body.appendChild(downloadLink);
    }
  };
  request.send();
}

var directory = '/r'; // Ubah dengan path ke folder root file manager web Anda
generateSitemap(directory);


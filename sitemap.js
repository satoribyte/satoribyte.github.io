    $(document).ready(function() {
      generateSitemap();
    });

    function generateSitemap() {
      var directory = '/';

      $.ajax({
        url: 'startsitemap.php',
        method: 'GET',
        data: { dir: directory },
        dataType: 'json',
        success: function(files) {
          var xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
          xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

          files.forEach(function(file) {
            var path = directory + '/' + file.name;
            var url = 'http://localhost' + path;

            if (file.type === 'directory') {
              url += '/';
            }

            xml += '  <url>\n';
            xml += '    <loc>' + url + '</loc>\n';
            xml += '  </url>\n';
          });

          xml += '</urlset>';

          // Simpan sitemap.xml ke file
          var downloadLink = document.createElement('a');
          downloadLink.href = 'data:text/xml;charset=utf-8,' + encodeURIComponent(xml);
          downloadLink.download = 'sitemap.xml';
          downloadLink.innerText = 'Download Sitemap';
          document.body.appendChild(downloadLink);
        },
        error: function() {
          console.log('Error generating sitemap.');
        }
      });
              }

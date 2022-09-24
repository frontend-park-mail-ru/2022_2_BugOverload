find . -name "*.handlebars"|while read fname; do
  handlebars -m $fname -f ../pre_compile_templates/${fname%.*}.tpl.js
done
grunt concat
$SHELL
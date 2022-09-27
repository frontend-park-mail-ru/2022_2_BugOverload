find . -name "*.handlebars"|while read fname; do
  # echo $(basename "${fname%.*}")
  handlebars -m $fname -f public/pre_compile_templates/$(basename "${fname%.*}").tpl.js
done
cd src/templates
grunt concat
cd ../..
$SHELL
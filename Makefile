
build: template.js dialog.css index.js components
	@component build

template.js: template.html
	@component convert $<

components:
	@component install

clean:
	rm -fr build
	rm -f template.js

.PHONY: clean
.PHONY: locale/ja
locale/ja:
	rsync -Cav --exclude='.git' --exclude-from=translate-files.txt locale/en/ locale/ja/
	rsync -Cav i18n/target/ locale/ja/

.PHONY: i18n/source
i18n/source:
	rsync -Cav --delete --include='*/' --include-from=translate-files.txt --exclude='*' locale/en/ i18n/source/

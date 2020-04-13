.PHONY: locale/ja
locale/ja:
	rsync -Cav --include='*/' --exclude='*.md' --include='*' locale/en/ locale/ja/
	rsync -Cav --include='*/' --include='*.md' --exclude='*' i18n/target/ locale/ja/

.PHONY: i18n/source
i18n/source:
	rsync -Cav --include='*/' --include='*.md' --exclude='*' locale/en/ i18n/source/

# 翻訳対象のファイルの一覧
TRANSLATE_FILES := \
    /crystal-book/***.md \
    /crystal-website/index.html \

# 翻訳元から翻訳対象のディレクトリ `i18n/source` にファイルをコピーする
.PHONY: i18n/source
i18n/source:
	rsync -Cav --delete --include='*/' $(patsubst %, --include='%', $(TRANSLATE_FILES)) --exclude='*' locale/en/ i18n/source/

# 翻訳元・翻訳結果から `locale/ja` にファイルをコピーする
.PHONY: locale/ja
locale/ja:
    # `locale/en` から翻訳対象以外のファイルをコピーしてくる
	rsync -Cav --exclude='.git' --exclude='/crystal-book/book.json' $(patsubst %, --exclude='%', $(TRANSLATE_FILES)) locale/en/ locale/ja/
    # 翻訳結果のファイルを `i18n/target` からコピーしてくる
	rsync -Cav --exclude='.gitkeep' i18n/target/ locale/ja/
    # `crystal-book/book.json` から `ga` (Google Analytics) プラグインを外して、`edit-link` プラグインの設定を更新する。
    # TODO: この部分は別スクリプトにすべき？
	@echo 'jq "...update book.json..." locale/en/crystal-book/book.json > locale/ja/crystal-book/book.json'
	@jq '\
	    del(.pluginsConfig.ga) | .plugins = [.plugins[] | select(. != "ga")] |\
	    .pluginsConfig["edit-link"].base = "https:/github.com/crystal-jp/ja.crystal-lang.org/edit/master/locale/ja/crystal-book" |\
	    .pluginsConfig["edit-link"].label = "このページを編集" \
	' locale/en/crystal-book/book.json > locale/ja/crystal-book/book.json

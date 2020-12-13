GITBOOK ?= gitbook

# 翻訳対象のファイルの一覧
TRANSLATE_FILES := \
    /crystal-book/***.md \
    /crystal-website/_config.yml \
    /crystal-website/_data/install.yaml \
    /crystal-website/_includes/sponsors_sidebar.html \
    /crystal-website/_includes/install_from_*.md \
    /crystal-website/_layouts/default.html \
    /crystal-website/_layouts/install.html \
    /crystal-website/_posts/2020-06-09-crystal-0.35.0-released.md \
    /crystal-website/_posts/2020-06-19-crystal-0.35.1-released.md \
    /crystal-website/_posts/2020-08-06-shards-0.12.0-released.md \
    /crystal-website/blog/index.html \
    /crystal-website/community/index.html \
    /crystal-website/docs.html \
    /crystal-website/index.html \
    /crystal-website/install/index.html \
    /crystal-website/install/*.md \
    /crystal-website/media/index.html \
    /crystal-website/sponsors/index.html \
    /crystal-website/sponsors/original-sponsors.html \

FIX_ENTITY_FILES := \
    /crystal-website/_posts/2020-06-09-crystal-0.35.0-released.md \

# 翻訳元から翻訳対象のディレクトリ `i18n/source` にファイルをコピーする
.PHONY: i18n/source
i18n/source:
	rsync -Cav --delete --include='*/' $(patsubst %, --include='%', $(TRANSLATE_FILES)) --exclude='*' locale/en/ i18n/source/

# 翻訳元・翻訳結果から `locale/ja` にファイルをコピーする
.PHONY: locale/ja
locale/ja:
	# `locale/en` から翻訳対象以外のファイルをコピーしてくる
	rsync -Cav --exclude='.git' --exclude='mkdocs.yml' --exclude='requirements.in' --exclude='requirements.txt' $(patsubst %, --exclude='%', $(TRANSLATE_FILES)) locale/en/ locale/ja/
	# 翻訳結果のファイルを `i18n/target` からコピーしてくる
	rsync -Cav --exclude='.gitkeep' i18n/target/ locale/ja/
	sed -i '' -e 's/&amp;/\&/g' $(patsubst %, locale/ja/%, $(FIX_ENTITY_FILES))
	sed -i '' -e 's/\\&quot;//g' locale/ja/crystal-website/community/index.html
	sed -i '' -e 's/   /    /g' locale/ja/crystal-book/docs/SUMMARY.md

.PHONY: clean
clean:
	rm -rf public
	rm -rf locale/ja/crystal-book/_book
	rm -rf locale/ja/crystal-website/_site

.PHONY: public
public: locale/ja/crystal-book/site locale/ja/crystal-website/_site
	rm -rf public
	cp -r locale/ja/crystal-website/_site public
	cp -r locale/ja/crystal-book/site public/reference

.PHONY: locale/ja/crystal-book/site
locale/ja/crystal-book/site:
	cd locale/ja/crystal-book && make build

.PHONY: locale/ja/crystal-website/_site
locale/ja/crystal-website/_site:
	cd locale/ja/crystal-website && docker-compose run web sh -c '(bundle check || bundle install --jobs=3) && bundle exec jekyll build'

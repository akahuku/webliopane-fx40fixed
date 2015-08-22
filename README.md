weblioPane fx40fixed
====================

## これはなに？

[weblioPane](https://addons.mozilla.org/ja/firefox/addon/webliopane/) という、
web ページ上で選択した英単語に対して辞書をポップアップする素晴らしい Firefox
向けの拡張があります。

が、Firefox 40 から動かなくなってしまいました。また、作者の方の
[Twitter](https://twitter.com/HideAwayFx) も永らく更新が途絶えていて、新しい
バージョンを作成していただけるか不明な状態です。

というわけで、とりあえずの一時しのぎとして勝手に直したバージョンがこれです。

* オリジナル版とは ID が異なるので別の拡張とみなされます。
* オリジナル版が更新されたらこちらは用済みなので削除することになると思います。
* 現在、sdk/selection モジュールが e10s 環境で動きません。そのため sdk/PageMod
  モジュールを使ったあまり堅牢ではなさそうな回避策を用いています。
  もしかしたらポップアップ処理周りでバグがあるかもしれません。

## ライセンス

オリジナルに準じます。オリジナルのライセンスはおそらく MPL 2.0 です。

## バグ報告など

[github](https://github.com/akahuku/webliopane-fx40fixed/issues) で issue を
作ってください。

fx40fixed 版のバグなどについて、オリジナルの作者の方へ問い合わせたりはしないで
ください。

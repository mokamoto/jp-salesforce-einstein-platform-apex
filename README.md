# jp-salesforce-einstein-platform-apex

このリポジトリは [salesforce-einstein-platform-apex](https://github.com/muenzpraeger/salesforce-einstein-platform-apex) を日本語化したもので、 [Salesforce Einstein Platform API](https://metamind.readme.io/) をApexベースのApexラッパーを使ってどように利用するかの実例を示したものです。より最新の情報や、実際にアプリケーションを作成する際にWrapperクラスの最新版を利用したい場合などは、オリジナルのリポジトリを参考にして下さい。

[製品ドキュメント(英語)](https://metamind.readme.io/) に一般的なSalesforce Einstein Platform API をどのように利用するのか、いつから正式リリースになるのかなどの情報が提供されております。

ラッパークラスは古いオリジナルのラッパー [Salesforce Einstein Vision API](https://github.com/muenzpraeger/salesforce-einstein-vision-apex)を上書きしています。 このリポジトリには古いラッパーに比べて v2 のAPIで利用できるものが含まれています (画像のマルチラベル, 言語の intent およびsentiment)。

プレイグラウンドの挙動については以下のビデオをご覧ください(英語)

[![Playground](https://img.youtube.com/vi/poY8wR0pVks/0.jpg)](https://www.youtube.com/watch?v=poY8wR0pVks)


## 前提条件

このラッパーを利用するには以下の要件を満たしている必要があります:
* Salesforce組織へのアクセス。Developer Edition もしくはスクラッチ組織(もし持っていない場合は [無償でサインアップ](https://developer.salesforce.com/signup) できます)。
* Salesforce Einstein PlatformのAPIアカウント

セットアップの詳細については [Einstein Platform API](https://metamind.readme.io/docs/what-you-need-to-call-api) をご覧ください。

## インストール

### Salesforce DX - 新しいスクラッチ組織

リポジトリをローカルファイルシステムにクローンします。

```
git clone https://github.com/mokamoto/jp-salesforce-einstein-platform-apex.git
```

orgInit.sh スクリプトを実行します。
```
./orgInit
```

### Salesforce DX - Hub組織からデプロイを行う

こちらよりデプロイを行って下さい。

[![Deploy](https://deploy-to-sfdx.com/dist/assets/images/DeployToSFDX.svg)](https://deploy-to-sfdx.com/)


### Salesforce DX - Developer edition や 本番組織へデプロイ

Salesforce CLIを使ってソースを一般的な組織へ、メタデータAPIを使ってデプロイできます。

デプロイ対象の組織に認証を行いますdeployment org
```
sfdx force:auth:web:login -a yourOrgAlias
```

コンバートされたソースコードの出力ディレクトリを作成します
```
mkdir mdapi
```

Salesforce DXフォーマットのソースをMetatdata APIフォーマットへコンバートします
```
sfdx force:source:convert -r force-app -d mdapi
```

ソースをデプロイします
```
sfdx force:mdapi:deploy -d mdapi -u yourOrgAlias
```


## 設定方法

このラッパーファイルを組織にインストールした後に、2つのステップを必要とします:

* カスタム設定 => Einstein Settings  _Manage_ ボタンから作成) にある _Einstein EMail_ にEinstein Platformにサインアップした際のメールアドレスを設定する必要があります。
* Einstein Platformファイルを組織のファイルタブに保存します。この際名前を _einstein_platform_ にする必要があります。

[Trailhead](https://trailhead.salesforce.com/projects/build-a-cat-rescue-app-that-recognizes-cat-breeds) にも同様の手順について詳しくのせられていますのでご参考下さい。

インストールによりプレイグラウンドを含んだLightning アプリケーションがSalesforce組織へ追加されています。

![playground](resources/einstein_platform.png)

## 利用例
### 予測サービスの作成

基本的には `PredictionService` クラスを起点とします。Einstein APIとのコミュニケーションには検証済みのOAuth2トークンを使ってPredictionServiceを以下のように初期化します。

```
Einstein_PredictionService predictionService = new Einstein_PredictionService(Einstein_PredictionService.Types.IMAGE);
```

この例では予測さサービスを画像タイプで作成しています。タイプを変えることによって他で利用した予測を再利用できます。

```
service.setType(Einstein_PredictionService.Types.SENTIMENT);
```

### 全ての画像データセット

```
Einstein_PredictionService service = new Einstein_PredictionService(Einstein_PredictionService.Types.IMAGE);
List<Einstein_Dataset> datasets = service.getDatasets();
```

### intentデータセットの学習

```
Einstein_PredictionService service = new Einstein_PredictionService(Einstein_PredictionService.Types.INTENT);
Einstein_Model model = service.trainDataset(datasetId, 'the dataset name', 0, 0, '';
```

### 予測

画像の認識ではBase64エンコードされたBlogデータをアップロードするか、外部URL(公開されているものに限る)を利用できます。 外部URLを事前に登録しておきます。

```
Einstein_PredictionResult result = service.predictImageUrl('GeneralImageClassifier', 'yourUrl', 5, '');
```

intent および sentiment の予想は似ています。こちらの例ではIntentを利用しています。

```
Einstein_PredictionResult result = service.predictIntent('yourModelId', 'theText', 0, '');
```


## 開発に協力する

オリジナルの開発に協力したい暴いには [contribution](https://github.com/muenzpraeger/salesforce-einstein-platform-apex/blob/master/CONTRIBUTION.md) を読んでからプルリクエストを送信して下さい。

## ライセンス

ライセンスはオリジナルに準じます。オリジナルのライセンスはこちらです [license file](https://github.com/muenzpraeger/salesforce-einstein-platform-apex/blob/master/LICENSE.md)。

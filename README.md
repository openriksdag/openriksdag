# openriksdag
Visually explore Sweden's Riksdagen

## Setting Things Up

Have `yarn` installed (`brew install yarn` on macOS with HomeBrew).

```shell script
cd web
yarn
```

To setup the data processing code you'll need node.js installed. You can use `nodenv` and then
```shell script
cd data  # From root, not from web
nodenv install 
yarn
```

and answer yes.
If you want to install node by yourself, look at `data/.node-version` to check which version is being used.


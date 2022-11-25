# NEAR / GCash Integration

## Frontend
The frontend was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Execute

```bash
npm start
```

to run it in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## NEAR Lake Monitoring Script
We have a backend script that monitors NEAR USDC token transfer events using the NEAR Lake. You can find the script in the `/scripts` folder.

You need to have your AWS credentials set up as described on the [Credentials](https://docs.near.org/tutorials/indexer/credentials) page. Basically there should be a `default` profile in the `~/.aws/credentials` file. If you prefer to use another profile, you can specify it using the `AWS_PROFILE` environment variable, like

```bash
export AWS_PROFILE=<profile>
```

You can start the monitor with

```bash
npm run near-lake-ft-monitor <BLOCK HEIGHT>
```

<BLOCK HEIGHT> is an optional parameter to specify starting block height to run the monitor. You can look at the [NEAR block explorer](https://explorer.mainnet.near.org/) to see the latest block height. If not specified, it'll default to 78954000, and you should see a USDC transfer event in block 78954003.
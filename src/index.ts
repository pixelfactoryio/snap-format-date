import jp from "jsonpath";
import dotenv from "dotenv";
import fs from "fs";

import { changeValuesByPath } from "./helpers";

dotenv.config();

const snapConfig = process.env.SNAP_CONFIG as string;
const configRaw = fs.readFileSync(snapConfig, "utf8");
const config = JSON.parse(configRaw);

const inputDataPath = process.env.SNAP_INPUT_DATA_PATH as string;
const rawdata = fs.readFileSync(inputDataPath, "utf8");
const data = JSON.parse(rawdata);
const outputDataPath = process.env.SNAP_OUTPUT_DATA_PATH as string;

const nodes = jp.apply(data, config.mapping.jpath, function (value) {
  return value.toUpperCase();
});

const result = changeValuesByPath(data, nodes, "side");
fs.writeFileSync(outputDataPath, JSON.stringify(result));

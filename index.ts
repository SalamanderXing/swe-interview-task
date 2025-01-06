import { err, errAsync, ok, okAsync, Result, ResultAsync } from "neverthrow";
import assert from "assert";

const myFancyAI = (
  callBack: () => Promise<string>,
): ResultAsync<string, Error> => {
  return ResultAsync.fromPromise(
    new Promise(async (resolve, reject) => {
      //const shouldReturnError = ;
      if (Math.random() > 0.5) {
        reject(new Error("error"));
        return;
      }
      resolve(await callBack() + " fancyAI was here");
    }),
    (err) => err,
  ) as ResultAsync<string, Error>;
};

const myExecFunctions = async (i: number): Promise<string> => {
  const delay = 1_000;
  const results = ["hello", "world", "test", "test2", "test3"];
  const result = results[i % results.length];
  return await new Promise((resolve) =>
    setTimeout(
      () => resolve(result),
      delay,
    )
  );
};

// TODO:
// - take 5000 calls from myExecFunctions (with as args indices ranging from 0 to 4999) and pipe them into myFancyAI
// - the result promises must be executed 1000 at the same time (concurrently). So at any given time there should be roughly 1000 ongoing calls.
// - there must be a retry-logic that tries at most 3 times before returning the error
// - functions must be **executed** in the order they are given
// - At the end, you must display:
//    - total number of successfull calls
//    - total number of failed calls
//    - percentage of success rate of all calls

const concurrentTasks = 1000;

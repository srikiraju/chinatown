open Response;

type tileType =
  | Blank
  | Number(int);

[@react.component]
let make = (~numbers, ~state: state, ~myTiles) => {
  let ren = y =>
    switch (y) {
    | Number(x) =>
      let o = state.ownership[x - 1];
      let color = Players.colorFromPlayer(o.player);
      let shop = o.shop;
      let pink =
        switch (myTiles) {
        | Some(tiles) => List.exists(y => x == y, tiles)
        | None => false
        };

      <Tile pink id={string_of_int(x)} key={string_of_int(x)} color shop />;
    | Blank => <BlankTile />
    };

  <div className="flex ma2">
    {List.map(ren, numbers) |> Array.of_list |> React.array}
  </div>;
};

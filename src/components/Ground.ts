import Matrix from "~/src/lib/Matrix";
import { Component } from "~/src/ECS";
import { Terrain } from "~/src/World";

export default class Ground extends Component<Matrix<Terrain>> {}

export class Character {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly birthYear: string,
    public readonly gender: string,
    public readonly species: string[],
    public readonly films: string[],
  ) {}
}

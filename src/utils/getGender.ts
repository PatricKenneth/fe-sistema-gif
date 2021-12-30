export function getGender(gender: string): string | undefined {
    const genders: Map<string, string> = new Map();
    genders.set("MALE", "Masculino");
    genders.set("FEMALE", "Feminino");
    genders.set("NOT_DECLARED", "Não Declarado");
    return genders.get(gender) || "-";
}
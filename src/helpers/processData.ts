export interface Country {
  name: {
    common: string;
  }
}

export const processData = (data: Country[]) => data.map(country => country.name.common);

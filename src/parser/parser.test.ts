import { parseMp2k } from './parser';

describe('Parser', () => {
  const setup = () => {
    const mockData = `5
      1 2 72 1 2
      1 3 72 1 2
      2 3 72 1 2
      2 4 72 1 2
      3 4 72 1 2
      -1
      
      6
      
      1 2 3
      3
      1 1 
      2 2 3 
      3 2 5 4 
      
      1 3 4
      3
      1 2 
      2 1 3 
      3 1 4 5 
      
      1 4 5
      2
      1 1 4 
      2 2 5 
      
      2 3 2
      3
      1 3 
      2 1 2 
      3 4 5 
      
      2 4 3
      3
      1 4 
      2 3 5 
      3 1 2 5 
      
      3 4 4
      3
      1 5 
      2 3 4 
      3 2 1 4 `;

    return { mockData };
  };

  it('should have parse function', () => {
    expect(parseMp2k).not.toBe(undefined);
  });

  it('should parse file', () => {
    const { mockData } = setup();
    expect(parseMp2k(mockData)).toEqual({});
  });
});

import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import MonsterDataProps from '../interfaces/MonsterDataProps.ts';
import { GET_MONSTER_TYPE_COUNTS, GET_MONSTERS } from '../graphql/queries/monsterQueries.ts';

function useMonster(
  searchTerm: string,
  currentPage: number,
  monstersPerPage: number,
  selectedFilters: Set<string>,
  minHp?: number | null,
  maxHp?: number | null,
  sortOption: string = 'name-asc'
) {
  const offset = (currentPage - 1) * monstersPerPage;

  const queryVariables = {
    searchTerm,
    offset,
    limit: monstersPerPage,
    types: Array.from(selectedFilters),
    sortOption,
    ...(minHp !== undefined && maxHp !== undefined ? { minHp, maxHp } : {}),
  };

  const { data, error, loading } = useQuery<{
    monsters: { monsters: MonsterDataProps[]; totalMonsters: number; minHp: number; maxHp: number };
  }>(GET_MONSTERS, {
    variables: queryVariables,
    fetchPolicy: 'cache-first',
  });

  const { data: typeCountsData } = useQuery(GET_MONSTER_TYPE_COUNTS, {
    variables: { minHp, maxHp },
    fetchPolicy: 'cache-and-network',
  });

  const monsterCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    typeCountsData?.monsterTypeCounts.forEach((entry: { type: string; count: number }) => {
      counts[entry.type] = entry.count;
    });
    return counts;
  }, [typeCountsData]);

  const monsterTypes = useMemo(() => {
    return Object.keys(monsterCounts);
  }, [monsterCounts]);

  const transformedMonsters = useMemo(() => {
    if (!data || !data.monsters) return [];
    const filteredMonsters = data.monsters.monsters.filter(
      (monster) => selectedFilters.size === 0 || selectedFilters.has(monster.type)
    );

    return filteredMonsters.map((monster) => ({
      id: monster.id,
      name: monster.name,
      type: monster.type,
      hit_points: monster.hit_points,
      alignment: monster.alignment,
      size: monster.size,
      image: monster.image,
    }));
  }, [data, selectedFilters]);

  return {
    monsters: transformedMonsters,
    totalMonsters: data?.monsters.totalMonsters || 0,
    minHp: data?.monsters.minHp || 1,
    maxHp: data?.monsters.maxHp || 1000,
    monsterCounts,
    monsterTypes,
    loading,
    error,
  };
}

export default useMonster;

import useClasses from '../../hooks/useClasses.ts';
import ClassCard from '../../components/CharacterCustomization/ClassCard.tsx';
import SubPageLayout from '../../components/Layouts/SubPageLayout.tsx';

export default function ClassPage() {
  const classes = ['barbarian', 'bard', 'cleric', 'druid', 'fighter', 'monk', 'paladin', 'ranger', 'rogue', 'sorcerer', 'warlock', 'wizard'];
  const classData = classes.map(useClasses);

  return (
    <SubPageLayout>
      <main className="flex flex-col items-center w-full">
        {classData.map((classInfo, index) => (
          <ClassCard
            key={index}
            name={classInfo.name}
            hit_die={classInfo.hit_die}
            index={classInfo.index}
          />
        ))}
      </main>
    </SubPageLayout>
  );
}